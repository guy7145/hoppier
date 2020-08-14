from page_objects.hopslist.bs_utils import inline_links, first_child, format_text, to_float_list
from page_objects.hopslist.consts import PERCENTILE_KEYS, TOTAL_OIL_KEY, SUBS_KEY, HOPSLIST_STYLES_KEY, STYLES_KEY
from page_objects.hopslist.page_object import PageObject

hop_title_attributes = {
    'name': 'h1',
    'attrs': {
        'class': 'entry-title',
    }
}


hop_document_attributes = {
    'name': 'div',
    'attrs': {
        'class': 'entry-content content',
    }
}


table_attributes = {
    'name': 'table',
}


hop_characteristics_entry_attributes = {
    'name': 'tr',
}

NB_NON_DESCRIPTION_PARAGRAPHS = 2


class HopPage(PageObject):
    def __init__(self, hop_name, hop_link):
        super().__init__(hop_link)
        self.hop_name = hop_name

    @staticmethod
    def format_property_name(name):
        name = name.replace('\xa0', ' ')  # patch: replace &nbsp with space
        name = name.lower().replace('composition', '').strip()
        return name

    @staticmethod
    def parse_hop_characteristics(characteristics):
        def update(key, transform):
            characteristics[key] = transform(characteristics.get(key, ''))

        def change_key(old_key, new_key):
            characteristics[new_key] = characteristics[old_key]
            del characteristics[old_key]

        for key in PERCENTILE_KEYS:
            update(key, HopPage.parse_percentile_or_numeric)

        if characteristics[TOTAL_OIL_KEY] != '':
            update(
                TOTAL_OIL_KEY,
                lambda v: HopPage.parse_percentile_or_numeric(v.replace('ml', ' ').split(' ')[0])  # first replace is a patch
            )

        change_key(HOPSLIST_STYLES_KEY, STYLES_KEY)
        update(STYLES_KEY, lambda v: [s.strip() for s in v.split(',')])
        update(SUBS_KEY, lambda v: [s.strip() for s in v.split(',')])
        return characteristics

    @staticmethod
    def parse_percentile_or_numeric(text):
        text = text.lower()

        if text == '':
            return '?'

        if text == 'none' or text.find('trace') != -1:
            return 0

        text = text.replace('.%', '%')  # patch

        text = to_float_list(
            text.replace('%', '')
                .split('-')
        )
        return text[0] if len(text) == 1 else text

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

    def get_hop_title(self):
        return first_child(self.page_source.find(**hop_title_attributes))

    def fetch_hop_characteristics(self):
        result = {
            'title': self.get_hop_title(),
            'description': self.get_hops_description(),
        }
        tables = self.page_source.find_all(**table_attributes)
        while len(tables[0].find_all(name='tr')) == 1:
            tables.pop(0)
        characteristics_table = tables[0]

        for characteristic in characteristics_table.find_all(**hop_characteristics_entry_attributes):
            entries = list(characteristic.find_all(name='td'))
            name = HopPage.format_property_name(first_child(entries[0]))

            if len(entries) == 1:
                result[name] = ''
            else:
                value = entries[1]
                inline_links(value)
                result[name] = format_text(''.join(value))

        return HopPage.parse_hop_characteristics(result)
