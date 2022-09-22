//[Reference] : https://www.patterns.dev/posts/singleton-pattern/

/**
 * Singletons are classes which can be instantiated once, and can be accessed globally.
 * This single instance can be shared throughout our application, which makes Singletons great for managing global state in an application.
 */

let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
  }

  getCounte() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// const counter1 = new Counter();
// const counter2 = new Counter();
// Error: You can only create one instance!

/**
 * We aren't able to create multiple instances anymore.
 * We should freeze the instance, So that instance can not be modified by consuming code.
 *
 * Properties on the frozen instance cannot be added or modified,
 * which reduces the risk of accidentally overwriting the values on the Singleton.
 */

const singletonCounter = Object.freeze(new Counter());

singletonCounter.decrement = () => {
  console.log('decrement function called');
};

singletonCounter.decrement();

/**
 * Above code will not override decrement method
 */

/**
 * Application implementation examples
 *
 * 1: Hardware interface access
 *    Practically singleton can be used in case external hardware resource usage limitation required
 *    e.g. Hardware printers where the print spooler can be made a singleton to avoid multiple concurrent
 *         accesses and creating deadlock.
 *
 * 2: Logger:
 *   Singleton classes are used in log file generations.
 *   Log files are created by the logger class object.
 *
 *   If there is multiple client application using this logging utility class they might create multiple instances
 *   of this class and it can potentially cause issues during concurrent access to the same logger file.
 *   We can use the logger utility class as a singleton and provide a global point of reference so that each user
 *   can use this utility and no 2 users access it at the same time.
 *
 * 3: Configuration File:
 *  This is another potential candidate for Singleton pattern because this has a performance benefit as it prevents
 *  multiple users to repeatedly access and read the configuration file or properties file. It creates a single instance
 *  of the configuration file which can be accessed by multiple calls concurrently as it will provide static config data
 *  loaded into in-memory objects. The application only reads from the configuration file for the first time and thereafter
 *  from second call onwards the client applications read the data from in-memory objects.
 *
 * 4: Cache:
 *  We can use the cache as a singleton object as it can have a global point of reference and for all future calls to the cache object
 *  the client application will use the in-memory object.
 */

/**
 * (Dis)advantages
 *
 * Restricting the instantiation to just one instance could potentially save a lot of memory space. Instead of having to set up memory
 * for a new instance each time, we only have to set up memory for that one instance, which is referenced throughout the application.
 * However, Singletons are actually considered an anti-pattern, and can (or.. should) be avoided in JavaScript.
 *
 * However, the class implementation shown in the examples above is actually overkill. Since we can directly create objects in JavaScript,
 * we can simply use a regular object to achieve the exact same result. Let's cover some of the disadvantages of using Singletons!
 */

let count = 0;

const newCounter = {
  increment() {
    return ++count;
  },

  descrement() {
    return --count;
  },
};

Object.freeze(newCounter);
// export { newCounter };

// [Global Behavior]

/**
 *  A Singleton instance should be able to get referenced throughout the entire app.
 *  Global variables essentially show the same behavior: since global variables are
 *  available on the global scope, we can access those variables throughout the application.
 *
 *  Having global variables is generally considered as a bad design decision.
 *  Global scope pollution can end up in accidentally overwriting the value of a global variable,
 *  which can lead to a lot of unexpected behavior.
 *
 */
