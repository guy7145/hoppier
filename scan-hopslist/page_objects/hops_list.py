from dataclasses import dataclass

from bs4 import BeautifulSoup

from page_objects.bs_utils import get_first_child, format_text
from page_objects.page_object import PageObject

HOPS_LIST_URL = 'http://www.hopslist.com/hops'


column_attributes = {
    'name': 'div',
    'attrs': {
        'data-x-element': 'column',
    }
}

column_title_attributes = {
    'name': 'h3',
}

hops_list_entry_attributes = {
    'name': 'li',
    'attrs': {
        'class': 'listing-item',
    }
}


@dataclass
class HopLink:
    hop_name: str
    hop_link: str


class HopsListPage(PageObject):
    @staticmethod
    def __get_hops_from_column_page_element(page_element: BeautifulSoup):
        for entry in page_element.find_all(**hops_list_entry_attributes):
            entry = get_first_child(entry)
            yield get_first_child(entry), entry.get('href')

    def __init__(self):
        super().__init__(HOPS_LIST_URL)

    def get_hops_list(self):
        result = []
        for column in self.page_source.find_all(**column_attributes):
            children = list(filter(lambda child: str(child) != '\n', column.children))
            for hop_name, hop_link in HopsListPage.__get_hops_from_column_page_element(children[1]):
                result.append(HopLink(format_text(hop_name), hop_link))
        return result
