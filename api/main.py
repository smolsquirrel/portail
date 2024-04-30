from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from grader_parser import Parser
import requests
import json

# import psycopg2
# import os
# from dotenv import load_dotenv

# load_dotenv()

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# conn = psycopg2.connect(
#     host=os.getenv("DATABASE_HOST"),
#     database="postgres",
#     user="postgres",
#     password=os.getenv("DATABASE_PASSWORD"),
# )
# conn.autocommit = True

# cur = conn.cursor()


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
    headers = json.dumps(dict(request.headers))
    credentials = await request.json()
    # if "origin" not in request.headers or request.headers["origin"] not in origins:
    #     response.status_code = status.HTTP_401_UNAUTHORIZED
    #     # cur.execute(
    #     #     "INSERT INTO logs.login_logs (username, success, details, method) VALUES (%s, %s, %s, %s);",
    #     #     (credentials["username"], False, headers, "login"),
    #     # )
    #     return {}

    with requests.Session() as client:
        parser = Parser(client)
        r = parser.login(**credentials)
        if not r:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            # cur.execute(
            #     "INSERT INTO logs.login_logs (username, success, details, method) VALUES (%s, %s, %s, %s);",
            #     (credentials["username"], False, headers, "login"),
            # )
            return {}
        x = parser.simple_get_tables()
        tables = x["tables"]
        # cur.execute(
        #     "INSERT INTO logs.login_logs (username, success, details, class, name, method) VALUES (%s, %s, %s, %s, %s, %s);",
        #     (credentials["username"], True, headers, r["class"], r["name"], "login"),
        # )
        return {
            "url": r["url"],
            "cookie": r["cookie"]["value"],
            "data": parser.simple_parse_tables(tables),
            "default": x["default"],
        }


@app.post("/all_grades")
async def all_grades(request: Request, response: Response):
    # if "origin" not in request.headers or request.headers["origin"] not in origins:
    #     response.status_code = status.HTTP_401_UNAUTHORIZED
    #     # cur.execute(
    #     #     "INSERT INTO logs.login_logs (success, details, method) VALUES ( %s, %s, %s);",
    #     #     (False, json.dumps(dict(request.headers)), "all_grades"),
    #     # )
    #     return {}

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
        # cur.execute(
        #     "INSERT INTO logs.login_logs (success, details, method) VALUES ( %s, %s, %s);",
        #     (True, json.dumps(dict(request.headers)), "all_grades"),
        # )
        return tables


@app.get("/")
async def root():
    return {}
