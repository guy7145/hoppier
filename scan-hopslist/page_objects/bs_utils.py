import re

from bs4 import BeautifulSoup


def get_first_child(page_element: BeautifulSoup):
    return list(page_element.children)[0]


def inline_links(page_element: BeautifulSoup):
    for link in page_element.find_all(name='a'):
        link.replace_with_children()


def format_text(text, lowercase=True):
    # removes non-alphanumeric characters except: [white-space _ - , .]
    return re.sub(r'[^A-Za-z0-9_\- ,.()%]+', '', text.lower() if lowercase else text)
