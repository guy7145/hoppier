import json
import os
from multiprocessing.pool import Pool

from page_objects.hopslist.hop_page import HopPage
from page_objects.hopslist.hops_list import HopsListPage, HopLink

DATA_DIR_PATH = '../data'


def fetch_hop(hop: HopLink):
    path = f'{DATA_DIR_PATH}/{hop.hop_name.replace(" ", "-")}.json'
    try:
        if not os.path.exists(path):
            hop_data = HopPage(hop.hop_name, hop.hop_link).fetch_hop_characteristics()
            with open(path, 'w') as f:
                json.dump(hop_data, f)
            print(f' - {hop.hop_name}')

    except Exception as e:
        print(f'some problem with {hop.hop_name}: {e}')


def fetch_data(nb_processes=1):
    hops = HopsListPage().get_hops_list()
    if nb_processes == 1:
        for hop in hops:
            fetch_hop(hop)
    else:
        with Pool(nb_processes) as pool:
            pool.map(fetch_hop, hops)


def export_data(output_path):
    export = {}

    def hopname(filename: str):
        return filename[:-len('.json')]

    for root, _, files in os.walk(DATA_DIR_PATH):
        for f in files:
            with open(os.path.join(root, f), 'r') as json_file:
                key = hopname(f)
                if key in export:
                    print(f'overriding {key}...')
                export[key] = json.load(json_file)

    with open(output_path, 'w') as output_file:
        json.dump(export, output_file)

    return


if __name__ == '__main__':
    fetch_data(8)
    export_data('../app/server/data.json')
    print('done.')
