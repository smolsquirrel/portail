from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from grader_parser import Parser
import requests

app = FastAPI()
origins = ["jdlmsweats.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["jdlmsweats.vercel.app"])


@app.post("/grades", status_code=200)
async def grades(request: Request, response: Response):
    with requests.Session() as client:
        parser = Parser(client)
        logged = parser.login(**(await request.json()))
        if not logged:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {}
        tables = parser.get_all_tables()
        default = ""
        for table in tables:
            if not default:
                default = table
            tables[table] = parser.parse_tables(tables[table])
        tables["default"] = default
        return tables


@app.post("/login", status_code=200)
async def login(request: Request, response: Response):
    with requests.Session() as client:
        parser = Parser(client)
        r = parser.login(**(await request.json()))
        if not r:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {}

        x = parser.simple_get_tables()
        tables = x["tables"]

        return {
            "url": r["url"],
            "cookie": r["cookie"]["value"],
            "data": parser.simple_parse_tables(tables),
            "default": x["default"],
        }


@app.post("/all_grades")
async def all_grades(request: Request, response: Response):
    x = await request.json()
    with requests.Session() as client:
        client.cookies.set("ASP.NET_SessionId", x["cookie"])
        parser = Parser(client)
        parser.grades_url = x["url"]
        tables = parser.get_all_tables()
        default = ""
        for table in tables:
            if not default:
                default = table
            tables[table] = parser.parse_tables(tables[table])
        tables["default"] = default
        return tables
