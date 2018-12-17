// CODING CHALLENGE

/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/
// Our 3 parks have an avarege age of .... years;
// .... park ha a tree density of .... trees per square km;
// .... park ha a tree density of .... trees per square km;
// .... park ha a tree density of .... trees per square km;
//... park has more than 1000 trees.

// Our 4 streets have total length of ... km, with an average of ... km;
// ...., build in 1999, is a big street;

const townParks = [
  {
    name: 'Central Park',
    buildYear: 1985,
    size: 1.5,
    trees: 850,
  },
  {
    name: 'South Park',
    buildYear: 1975,
    size: 1.8,
    trees: 950,
  },
  {
    name: 'West Park',
    buildYear: 1950,
    size: 2.5,
    trees: 1350,
  },
];

const townSteets = [
  {
    name: 'Star street',
    buildYear: 1985,
    length: 2500,
    classification: 'small',
  },
  {
    name: 'Soverin street',
    buildYear: 1975,
    length: 3800,
  },
  {
    name: 'Gomer street',
    buildYear: 1950,
    length: 4550,
    classification: 'big',
  },
];

class Calculation {
  ageCalc(year) {
    let age = new Date().getFullYear() - year;
    return age;
  }
  averageCalc() {
    this.averages = (this.sum / this.element.length).toFixed(2);
  }
  densityCalc(trees, size) {
    return Math.round((trees / size).toFixed(2));
  }
  bigestPark(trees, name) {
    if (trees > 1000) {
      return name;
    }
  }
}

class Parks extends Calculation {
  constructor(parks) {
    super();
    this.element = parks;
    this.averageSum = 0;
    this.sum = 0;
  }

  finalReport() {
    console.log(`-------STREETS REPORT--------`);
    this.element.forEach(({ name, trees, buildYear, size }) => {
      this.sum += this.ageCalc(buildYear);
      console.log(
        `${name} park has a tree density of: ${this.densityCalc(
          trees,
          size,
        )} trees per square km`,
      );
      this.bigestPark(trees, name)
        ? console.log(`${name} park has more than 1000 trees.`)
        : null;
    });
    this.averageCalc();
    console.log(
      `Our ${this.element.length} parks have an avarege age of ${
        this.averages
      } years;`,
    );
  }
}

class Streets extends Calculation {
  constructor(streets) {
    super();
    this.element = streets;
    this.averageSum = 0;
    this.sum = 0;
  }

  finalReport() {
    console.log(`-------PARKS REPORT--------`);
    this.element.forEach(
      ({ name, length, buildYear, classification = 'normal' }) => {
        this.sum += length;
        console.log(
          `${name}, build in ${buildYear}, is a ${classification} street`,
        );
      },
    );
    this.averageCalc();
    console.log(
      `Our ${this.element.length} streets have total length of ${
        this.sum
      } km, with an average of ${this.averages} km`,
    );
  }
}

const parks = new Parks(townParks);

const streets = new Streets(townSteets);

parks.finalReport();

streets.finalReport();

// class Streets extends
