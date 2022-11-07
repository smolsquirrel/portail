from bs4 import BeautifulSoup as bs4
import re
import requests
from container import Container
from evaluation import Evaluation


class Parser:
    URL = "https://portailc.jdlm.qc.ca/pednet/"

    def __init__(self):
        self.s = requests.Session()
        self.grades_url = ""

    # Returns travaux page url
    def login(self, username, password):
        payload = {
            "txtLibWebBidon": "",
            "txtLibWebBidon": "",
            "txtCodeUsager": username,
            "txtMotDePasse": password,
            "btnConnecter.x": 23,
            "btnConnecter.y": 18,
            "_PostBackInfo": "",
            "_PostBackPar": "",
            "_NoSeqWeb": "",
            "_InfoSupp": "",
            "txtUsagerAut": "",
            "txtPassAut": "",
        }
        r = self.s.post(self.URL + "login.asp", data=payload)
        if r.url == self.URL + "login.asp":  # Login failed
            return False

        soup = bs4(r.text, "html.parser")
        self.grades_url = soup.find("a", string="Travaux")["href"]

        return True

    def get_tables(self):
        if not self.grades_url:
            return []
        r = self.s.get(self.URL + self.grades_url)
        soup = bs4(r.text, "html.parser")
        tables = soup.find_all("table", "BlueTableau")
        return tables

    def parse_tables(self, tables):
        course = None
        competence = None
        category = None
        courses = Container("USER")
        for table in tables:
            rows = table.find_all("tr")
            course_name = rows[0].text
            course_weight = int(re.search(r"\d(?=\D)", course_name).group(0))
            if course:
                if competence and category:  # Add previous
                    competence.add(category)
                    course.add(competence)
                if course_name != course.name:  # New course
                    courses.add(course)
                    course = Container(course_name, course_weight)
            else:
                course = Container(course_name, course_weight)
            c = re.match(r"(.+)\s\((\d+)%\)", rows[2].find("td").text)
            competence = Container(c.group(1), int(c.group(2)))
            category = None

            for row in rows[2:]:  # ignore headers
                cells = row.find_all("td")
                cat = cells[1].text.strip()
                if cat:
                    if category:
                        competence.add(category)
                    category = Container(cat)
                    cat_url = cells[2].find("a")["href"]
                    cat_r = self.s.get(self.URL + cat_url)
                    cat_soup = bs4(cat_r.text, "html.parser")
                    temp = (
                        cat_soup.find("div", "Panel")
                        .find_all("table")[2]
                        .find("tr")
                        .find_all("td")[1]
                        .text
                    )
                    cat_weight = int(re.match(r"(?:.+:\s)(\d+)", temp).group(1))
                    category.set_weight(cat_weight)

                x = cells[7].text.strip()  # Check empty
                if x:
                    e = Evaluation(cells)
                    category.add(e)
        competence.add(category)
        course.add(competence)
        courses.add(course)

        return courses.to_dict()
