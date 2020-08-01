import bs4
import requests


class PageObject:
    def __init__(self, url):
        self.__url = url
        self._response = self.__fetch()
        self.page_source = bs4.BeautifulSoup(self._response.text.lower(), features='html5lib')

    def __fetch(self):
        response = requests.get(self.__url)
        if response.status_code != 200:
            raise RuntimeError(f'couldn\'t fetch page: {self.__url}')

        return response
