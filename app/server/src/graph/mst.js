function kruskal(vertices, distances) {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            edges.push([distances.get(i, j), i, j])
        }
    }
    edges.sort((a, b) => b[0] - a[0]);

    const verticesInclusion = new Array(vertices.length);
    let includedEdges = [];
    while (includedEdges.length < vertices.length - 1) {
        const edge = edges.pop();
        if (verticesInclusion[edge[1]] && verticesInclusion[edge[2]]) {
            continue;
        }
        verticesInclusion[edge[1]] = 1;
        verticesInclusion[edge[2]] = 1;
        includedEdges.push(edge);
    }
    console.log(includedEdges);
}
