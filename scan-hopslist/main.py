import json
import os
from multiprocessing.pool import Pool

from page_objects.hop_page import HopPage
from page_objects.hops_list import HopsListPage, HopLink


def fetch_hop(hop: HopLink):
    path = f'../data/{hop.hop_name.replace(" ", "-")}.json'
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


if __name__ == '__main__':
    fetch_data(1)
    print('done.')
