from grader_parser import Parser
import requests

client = requests.Session()
p = Parser(client)
logged = p.login("OUYT18902", "OUYT30782")
tables = p.simple_get_tables()
print(p.secret)
parsed = p.simple_parse_tables(tables)
print(parsed)
