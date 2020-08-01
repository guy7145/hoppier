from page_objects.bs_utils import inline_links, get_first_child, format_text
from page_objects.page_object import PageObject


hop_document_attributes = {
    'name': 'div',
    'attrs': {
        'class': 'entry-content content',
    }
}


characteristics_table_attributes = {
    'name': 'table',
    'attrs': {
        'width': '620',
    }
}


hop_characteristics_entry_attributes = {
    'name': 'tr',
}

NB_NON_DESCRIPTION_PARAGRAPHS = 2


class HopPage(PageObject):
    def __init__(self, hop_name, hop_link):
        super().__init__(hop_link)
        self.hop_name = hop_name

    def get_hops_description(self):
        def paragraph_to_text(p):
            inline_links(p)
            return format_text(''.join(p.children), lowercase=False)

        paragraphs = []
        current_element = self.page_source.find(**hop_document_attributes).find(name='p', recursive=False)
        while current_element.name != 'table':
            if current_element.name == 'p':
                paragraphs.append(current_element)
            current_element = current_element.next_sibling

        description = ''.join(map(paragraph_to_text, paragraphs))
        return description

    @staticmethod
    def parse_hop_characteristics(characteristics):
        return characteristics

    def fetch_hop_characteristics(self):
        result = {
            'description': self.get_hops_description()
        }
        characteristics_table = self.page_source.find(**characteristics_table_attributes)
        for characteristic in characteristics_table.find_all(**hop_characteristics_entry_attributes):
            entries = list(characteristic.find_all(name='td'))
            name = get_first_child(entries[0])

            if len(entries) == 1:
                result[name] = ''
            else:
                value = entries[1]
                inline_links(value)
                result[name] = format_text(''.join(value))

        return HopPage.parse_hop_characteristics(result)
