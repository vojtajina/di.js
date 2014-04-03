/*
- define terms before using
  - maybe hover tooltips?

- hover tooltips for code

- can we use https://github.com/angular/dgeni ?

 */

// # Dependency Injection Framework
//
// ## What problem is it solving?
// *Dependency Injection (DI) framework solves problems that you don’t have unless you
// follow the DI pattern ;-)*
//
// A good way to build large systems is to compose smaller systems - components - together.
// Each of these components is also composed from even smaller components and so on.
// You have probably heard this before, right?
//
// The secret to make these systems maintainable is to **keep the interactions between them as
// simple as possible** (loose coupling). In addition, in order to make these systems reusable and
// testable (it is really the same thing), it is better to wire them together dynamically rather
// than statically. This can be achieved through Dependency Injection pattern (a.k.a. Inversion of
// Control pattern).
//
// When you follow this pattern, you end up with a lot of boilerplate code that wires all the
// systems together and that's when a DI framework comes into the game:
//
// **DI framework solves the problem of assembling all the systems together.**
//
// Instead of writing the imperative code to wire all the systems together, each system declares its dependencies. This also reduces the amount of boilerplate you have to write, especially in tests.
//
// I tried to explain this in my ng-conf talk. [link]
//
// NOTE: all these examples are using ES6+,
// you can use “annotate” or `inject()` helpers if you wanna use ES6 or ES5.
// Annotations are just meta data added.
//

// ## Getting started
// We ask for an instance of `Car`. DI reads the `Inject` annotation and knows it needs an instance of `Engine`. So it creates an instance of `Engine` first, then passes the `Engine` instance to the `Car` constructor and returns us an instance of `Car`.
//
// This is super simple example and so the benefits of using a framework are not that big.
// In a bigger system, this will become more obvious. There will be only single `main()` method where you create the `Injector`, but the rest of the code is just components with declarative annotations.

import {Injector} from '../src/injector';
import {Inject} from '../src/annotations';

describe('docs', function() {

it('should resolve dependencies based on @Inject annotation', function() {
  class Engine {}

  @Inject(Engine)
  class Car {
    constructor(engine) {
      this.engine = engine;
    }
  }

  var injector = new Injector();
  var car = injector.get(Car);

  expect(car).toBeInstanceOf(Car);
  expect(car.engine).toBeInstanceOf(Engine);
});


// ## Overriding providers
// One of the main reasons why to use the DI pattern is that components are loosely coupled and
// wired together dynamically. That makes it easier to reuse and thus easier to test.
//
// When creating the `Injector`, you can pass a list of providers to override some binding.
// Now everybody who asks for `Engine` will get `MockEngine`
//
// This can be used to assemble a different app.
// For testing, see testing example [link].
// Also, see interfaces [link]
it('should override providers', function() {
  class Engine {}

  @Inject(Engine)
  class Car {
    constructor(engine) {
      this.engine = engine;
    }
  }

  @Inject(Engine)
  class LittleCar {
    constructor(engine) {
      this.engine = engine;
    }
  }

  @Provide(Engine)
  class MockEngine {}

  var injector = new Injector([MockEngine]);
  var car = injector.get(Car);
  var littleCar = injector.get(LittleCar);

  expect(car).toBeInstanceOf(Car);
  expect(car.engine).toBeInstanceOf(MockEngine);
  expect(littleCar).toBeInstanceOf(LittleCar);
  expect(littleCar.engine).toBeInstanceOf(MockEngine);
});

/*
Always a new instance
By default there is only a single instance of everything. If multiple components ask for the same dependency, they both get the same instance…
- code

If you always want a new instance, mark such a component with @TransientScope
- code


More complex life scopes
Everything a singleton or always new instance is not enough. Often, your system has life scopes such as “request” (handling a single request) or “session” (single user session across multiple requests) on the server or maybe a “route” (navigating to some view) on the client.

It is a good practice to make it clear what is the life scope of each component.
- memory management (longer components should not hold reference to short; or release the reference).
- easier to understand the program flow (WHY?)

DI framework makes this simpler. (HOW?)
- code creating a new life scope

It’s hierarchical:
- code

You can load additional code.
- code

You can force new instances.
- code


Lazy instantiation
You have a dependency, that is very expensive to construct… and thus you only want to instantiate it if it’s necesary…
- code example lazyInject with conditional

Lazy inject with locals - never cached


Promises - asynchronous injection
- todo



Type based injection
- todo
*/

});
