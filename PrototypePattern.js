// Share properties among many objects of the same type

/**
 * 
 The prototype pattern is a useful way to share properties among many objects of the same type.
 The prototype is an object that's native to JavaScript, and can be accessed by objects through 
 the prototype chain.
 */

/**
 * Let's say we want to create many dogs! In our example, dogs can't do that much:
 * they simply have a name, and they can bark!
 */

class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog('Daisy');
const dog2 = new Dog('Max');
const dog3 = new Dog('Spot');

/**
 * constructor contains a name property, and the class itself contains a bark property
 * We can see the prototype directly thourgh accessing the prototype property on a constructor
 * or through a __proto__ property on any instance
 */

console.log(Dog.prototype);
console.log(dog1.__proto__);

/**
 * The value of __proto__ on any instance of the constructor, is direct reference to the constructor's
 * prototype!.
 *  Whenever we try to access a property on an object that doesn't exist on the object directly,
 * JavaScript will go down the prototype chain to see if the property is available within the prototype chain.
 */

/**
 * The prototype pattern is very powerful when working with objects that should have
 * access to the same properties. Instead of creating duplicate of the property each time,
 * We can simply add the property to the prototype, since all new instance have access
 * to the prototype object.
 *
 * Since all instances have access to the prototype, it's easy to add properties to the prototype
 *  even after creating the instances.
 */

/**
 * Say that our dogs shouldn't only be able to bark, but they should also be able to play!
 *  We can make this possible by adding a play property to the prototype.
 */

class Dog1 {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog4 = new Dog('Daisy');
const dog5 = new Dog('Max');
const dog6 = new Dog('Spot');

Dog.prototype.play = () => console.log('Playing now!');

dog4.play();

/**
 * The term prototype chain indicates that there could be more than one step.
 * Indeed! So far, we've only seen how we can access properties that are directly
 * available on the first object that __proto__ has a reference to. However,
 * prototypes themselves also have a __proto__ object!
 */

/**
 * Lets create another type of dog, a super dog!
 * This dog should inherit everything from a normal Dog, but it should also be able to fly.
 * We can create a super dog by extending the Dog class and adding a fly method.
 */

class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    console.log('Flying!');
  }
}

const dog7 = new SuperDog('Daisy');
dog7.bark();
dog7.fly();

/**
 * It gets clear why it's called a prototype chain: when we try to access a property that's not
 * directly available on the object, JavaScript recursively walks down all the objects that __proto__ points to,
 * until it finds the property!
 */

// Object.create
/**
 * The Object.create method lets us create a new object, to which we can explicitly pass the value of its prototype
 */

const dog = {
  bark() {
    console.log(`Woof!`);
  },
};

const pet1 = Object.create(dog);

/**
 * Although pet1 itself dosen't have any properties, it dose have access to  properties on its
 * prototype chain! Since we have passed the dog object as pet1's prototype we can access the bark
 * property
 *
 */

pet1.bark(); // Woof!
