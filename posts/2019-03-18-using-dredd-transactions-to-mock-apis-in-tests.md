---
path: "/using-dredd-transactions-to-mock-apis-in-tests"
date: "2019-03-18"
title: "Using Dredd transactions to mock APIs in tests"
---
Just a quick one today. I've been working on my final year project at university, and I've decided to use [dredd](https://dredd.org/en/latest/) for contract testing my services. One stumbling block I came across was testing the frontend against these contracts. I discovered a way to get around this problem by generating mock responses using [dredd-transactions](https://github.com/apiaryio/dredd-transactions) which is the library dredd itself uses to create transaction objects under the hood.

Let's get on with it shall we?

### The Setup
My project's frontend is an Angular 7 application, using protractor for its E2E tests, as is standard. The frontend calls [OpenAQ's](https://openaq.org) API and displays air quality measurements on a map. [Check out the code if you're interested](https://github.com/Ricool06/breathe).

### The Contract
In a folder called `blueprints`, I have documented the parts of OpenAQ's API that I am using. I've used [API Blueprint](https://apiblueprint.org/) for this documentation, then I convert it to [Swagger/OpenAPI JSON](https://swagger.io/) during the tests using [apib2swagger](https://github.com/kminami/apib2swagger), but feel free to use Swagger or API blueprint directly if you prefer, as dredd supports both. I find that my approach gives me the best of both worlds, however, with the readability of API Blueprint, and the ability to use the Swagger JSON file in unit tests rather than bloating them with hundreds of object literals.

### The Code
Before any of the tests run, in my `beforeAll` section, I read the content of the blueprint file into a variable, to prevent excessive disk IO before every test. I also set up a CORS-enabled express instance, which listens for any request sent to it, and forwards it onto a utility method, `matchRequestWithResponse`.

```
let transactionsMap;
let openaqBlueprint;
let openaqBlueprintFilePath;
let mockOpenaqApiServer;

beforeAll(() => {
  transactionsMap = new Map<string, any>();

  openaqBlueprintFilePath = `${__dirname}/../../blueprints/openaq.apib.md`;
  openaqBlueprint = readFileSync(openaqBlueprintFilePath, 'utf8');

  const mockOpenaqApi = express();
  mockOpenaqApi.use(cors());

  mockOpenaqApi.all('*', matchRequestWithResponse);

  mockOpenaqApiServer = mockOpenaqApi.listen(environment.openaqApi.port);
});
```

Then, before each test, the blueprint is compiled into a set of dredd transactions (basically request/response pairs) and added to a map with the HTTP method and URI forming the key.

```
beforeEach(() => {
  dt.compile(openaqBlueprint, openaqBlueprintFilePath, (error, result) => {
    expect(error).toBeFalsy();
    result.transactions
      .map(transaction => transactionsMap.set(
        generateTransactionMapKey(transaction.request.method, transaction.request.uri),
        transaction));
  });

  page = new MapPage();
});

function generateTransactionMapKey(method, uri) {
  return `${method} ${url.parse(uri).pathname}`;
}
```

When a request is made by the app to the mock server, that request is matched up with the transaction in the map, then the response counterpart is returned by the express server. This is done by the `matchRequestWithResponse` function mentioned earlier.

```
function matchRequestWithResponse(req: express.Request, res: express.Response) {
  const { response } = transactionsMap.get(generateTransactionMapKey(req.method, req.url));

  res.status(response.status).json(JSON.parse(response.body));
}

function generateTransactionMapKey(method, uri) {
  return `${method} ${url.parse(uri).pathname}`;
}
```

### Bonus: Unit Tests
The Swagger JSON can also be imported into unit tests for sample data too, with a couple of caveats:
* The TypeScript compiler option `resolveJsonModule` must be set to true in `tsconfig.json`. 
* When you import the Swagger file __the object is cached__, meaning you should probably clone the object if you plan on changing some of the values if you don't want to break subsequent tests that rely on the original data. ([Lodash](https://lodash.com/) has a nice `cloneDeep` function I like to use.)

### Conclusion
I've found this method works quite well so far, and I can be sure that if OpenAQ's API ever changes, I can simply change the blueprint and fix any failing tests. More importantly, when I come to include my own backend services, I can facilitate the consumer-driven-contracts pattern for testing the frontend by automatically mocking my backend service. Any tests between multiple backend services can simply run dredd the traditional way, giving me confidence that all of the services in my system work together without _necessarily_ needing a full suite of system tests.

I'm still learning, so there might be 
