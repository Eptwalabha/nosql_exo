var readCursor = function(cursor) {
    return cursor.toArray();
};

var getChildren = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER p.source._id == @id && LENGTH(p.edges) == 1 RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getSons = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER p.source._id == @id && LENGTH(p.edges) == 1 && p.destination.gender == 'm' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getDaughters = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER p.source._id == @id && LENGTH(p.edges) == 1 && p.destination.gender == 'f' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getBrothers = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == 'gameOfThrone/Eddard_Stark' && LENGTH(p.edges) == 1 FOR q IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER q.source._id == p.destination._id && LENGTH(q.edges) == 1 && q.destination.gender == 'm' && q.destination._id != 'gameOfThrone/Eddard_Stark' RETURN q.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getSisters = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == 'gameOfThrone/Eddard_Stark' && LENGTH(p.edges) == 1 FOR q IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER q.source._id == p.destination._id && LENGTH(q.edges) == 1 && q.destination.gender == 'f' && q.destination._id != 'gameOfThrone/Eddard_Stark' RETURN q.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getFather = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == @id && LENGTH(p.edges) == 1 && p.destination.gender == 'm' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getMother = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == @id && LENGTH(p.edges) == 1 && p.destination.gender == 'f' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

/*
 FOR a IN PATHS(gameOfThrone, parentOf, 'inbound')
 FILTER a.source._id == @id && LENGTH(a.edges) == 1
 FOR b IN PATHS(gameOfThrone, parentOf, 'inbound')
 FILTER b.source._id == a.destination._id && LENGTH(b.edges) == 1
 FOR c IN PATHS(gameOfThrone, parentOf, 'outbound')
 FILTER c.source._id == b.destination._id && LENGTH(c.edges) == 1 && c.destination._id != a.destination._id && c.destination.gender == 'm'
 RETURN c.destination
 */

var getUncles = function(personnage) {
    stmt = db._createStatement({
        "query" : " FOR a IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER a.source._id == @id && LENGTH(a.edges) == 1 FOR b IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER b.source._id == a.destination._id && LENGTH(b.edges) == 1 FOR c IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER c.source._id == b.destination._id && LENGTH(c.edges) == 1 && c.destination._id != a.destination._id && c.destination.gender == 'm' RETURN c.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getAunts = function(personnage) {
    stmt = db._createStatement({
        "query" : " FOR a IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER a.source._id == @id && LENGTH(a.edges) == 1 FOR b IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER b.source._id == a.destination._id && LENGTH(b.edges) == 1 FOR c IN PATHS(gameOfThrone, parentOf, 'outbound') FILTER c.source._id == b.destination._id && LENGTH(c.edges) == 1 && c.destination._id != a.destination._id && c.destination.gender == 'f' RETURN c.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getGrandFathers = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == @id && LENGTH(p.edges) == 2 && p.destination.gender == 'm' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};

var getGrandMothers = function(personnage) {
    stmt = db._createStatement({
        "query" : "FOR p IN PATHS(gameOfThrone, parentOf, 'inbound') FILTER p.source._id == @id && LENGTH(p.edges) == 2 && p.destination.gender == 'f' RETURN p.destination"
    });
    stmt.bind("id", personnage);
    return stmt.execute();
};