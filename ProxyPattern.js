//[Reference] : https://www.patterns.dev/posts/proxy-pattern/

// Intercept and control interactions to target objects

/**
 *  With a Proxy object, we get more control over the interactions with certain objects.
 *  A proxy object can determine the behavior whenever we're interacting with the object,
 *  for example when we're getting a value, or setting a value.
 *
 *  Example:
 *   Generally speaking, a proxy means a stand-in for someone else.
 *   Instead of speaking to that person directly, you'll speak to the
 *   proxy person who will represent the person you were trying to reach.
 *   The same happens in JavaScript: instead of interacting with the target
 *   object directly, we'll interact with the Proxy object.
 */

//Let's create a person object, that represents John Doe.

const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};

/**
 *  Instead of interacting with this object directly, we want to interact with a proxy object.
 *  In JavaScript, we can easily create a new proxy by creating a new instance of Proxy.
 *
 *  Proxy In JS:
 *   The Proxy object enables you to create a proxy for another object,
 *   which can intercept and redefine fundamental operations for that object.
 *
 *  The Proxy object allows you to create an object that can be used in place of the original object,
 *  but which may redefine fundamental Object operations like getting, setting, and defining
 *  properties. Proxy objects are commonly used to log property accesses, validate, format, or
 *  sanitize inputs, and so on.
 */

const personProxy = new Proxy(person, {});

/**
 *  The second argument of Proxy is an object that represents the handler.
 *  In the handler object, we can define specific behavior based on the type of interaction.
 *  Although there are many methods that you can add to the Proxy handler, the two most common ones are get and set:
 *
 *   get: Gets invoked when trying to access a property
 *   set: Sets invoked when trying to modify a property
 */

const personProxy1 = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});

personProxy1.name;
personProxy1.age = 33;

/**
 *  A proxy can be useful to add validation. A user shouldn't be able to change person's age to a string value, or give them an empty name.
 *  Or if the user is trying to access a property on the object that doesn't exist, we should let the user know.
 */

const personProxy2 = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log("This property dose't exist in objext");
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },

  set: (obj, prop, value) => {
    if (prop === 'age' && typeof value != 'number') {
      console.log('Sorry you can only pass numeric value for age');
    } else if (prop === 'name' && value.length < 2) {
      console.log('Invalid name ');
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});

personProxy2.nonExistentProperty;
personProxy2.age = '23';
personProxy2.name = 'Thanos';

/**
 * The proxy made sure that we weren't modifying the person object with faulty values, which helps us keep our data pure!
 */
