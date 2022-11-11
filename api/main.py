from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from grader_parser import Parser
import requests

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/grades", status_code=200)
async def grades(request: Request, response: Response):
    with requests.Session() as client:
        parser = Parser(client)
        logged = parser.login(**(await request.json()))
        if not logged:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {}
        tables = parser.get_all_tables()
        for table in tables:
            tables[table] = parser.parse_tables(tables[table])
        return tables
