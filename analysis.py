
import numpy as n
import json
from pyknot2.spacecurves import Knot


def text_to_json(text):

    points = []
    for line in text.split('\n'):
        values = line.split(' ')
        if len(values) == 1 and len(values[0]) == 0:
            continue
        if len(values) != 3:
            raise ValueError('Invalid text passed.')
        points.append([float(v) for v in values])

    k = Knot(points)
    k.zero_centroid()
    max_extent = n.max(n.max(n.abs(k.points), axis=0))
    return json.dumps(k.points.tolist()), 2.5*max_extent
        
