const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Unit Tests", () => {
  suite("Translate to British", () => {
    test("Eg1", () => {
      const text = "Mangoes are my favorite fruit.";
      const result = translator.toBritish(text);
      const expected = "Mangoes are my favourite fruit.";
      assert.equal(result, expected);
    });

    test("Eg2", () => {
      const text = "I ate yogurt for breakfast.";
      const result = translator.toBritish(text);
      const expected = "I ate yoghurt for breakfast.";
      assert.equal(result, expected);
    });

    test("Eg3", () => {
      const text = "We had a party at my friend's condo.";
      const result = translator.toBritish(text);
      const expected = "We had a party at my friend's flat.";
      assert.equal(result, expected);
    });

    test("Eg4", () => {
      const text = "Can you toss this in the trashcan for me?";
      const result = translator.toBritish(text);
      const expected = "Can you toss this in the bin for me?";
      assert.equal(result, expected);
    });

    test("Eg5", () => {
      const text = "The parking lot was full.";
      const result = translator.toBritish(text);
      const expected = "The car park was full.";
      assert.equal(result, expected);
    });

    // test("Eg6", () => {
    //   const text = "Like a high tech Rube Goldberg machine.";
    //   const result = translator.toBritish(text);
    //   const expected = "Like a high tech Heath Robinson device.";
    //   assert.equal(result, expected);
    // });

    test("Eg7", () => {
      const text = "To play hooky means to skip class or work.";
      const result = translator.toBritish(text);
      const expected = "To bunk off means to skip class or work.";
      assert.equal(result, expected);
    });

    // test("Eg8", () => {
    //   const text = "No Mr. Bond, I expect you to die.";
    //   const result = translator.toBritish(text);
    //   const expected = "No Mr Bond, I expect you to die.";
    //   assert.equal(result, expected);
    // });

    // test("Eg9", () => {
    //   const text = "Dr. Grosh will see you now.";
    //   const result = translator.toBritish(text);
    //   const expected = "Dr Grosh will see you now.";
    //   assert.equal(result, expected);
    // });

    // test("Eg10", () => {
    //   const text = "Lunch is at 12:15 today.";
    //   const result = translator.toBritish(text);
    //   const expected = "Lunch is at 12.15 today.";
    //   assert.equal(result, expected);
    // });
  });

  //   suite("Translate to American", () => {
  //     test("Eg1", () => {
  //       const text = "We watched the footie match for a while.";
  //       const result = translator.toAmerican(text);
  //       const expected = "We watched the soccer match for a while.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg2", () => {
  //       const text = "Paracetamol takes up to an hour to work.";
  //       const result = translator.toAmerican(text);
  //       const expected = "Tylenol takes up to an hour to work.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg3", () => {
  //       const text = "First, caramelise the onions.";
  //       const result = translator.toAmerican(text);
  //       const expected = "First, caramelize the onions.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg4", () => {
  //       const text = "I spent the bank holiday at the funfair.";
  //       const result = translator.toAmerican(text);
  //       const expected = "I spent the public holiday at the carnival.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg5", () => {
  //       const text = "I had a bicky then went to the chippy.";
  //       const result = translator.toAmerican(text);
  //       const expected = "I had a cookie then went to the fish-and-chip shop.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg6", () => {
  //       const text = "I've just got bits and bobs in my bum bag.";
  //       const result = translator.toAmerican(text);
  //       const expected = "I've just got odds and ends in my fanny pack.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg7", () => {
  //       const text = "The car boot sale at Boxted Airfield was called off.";
  //       const result = translator.toAmerican(text);
  //       const expected = "The swap meet at Boxted Airfield was called off.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg8", () => {
  //       const text = "Have you met Mrs Kalyani?";
  //       const result = translator.toAmerican(text);
  //       const expected = "Have you met Mrs. Kalyani?";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg9", () => {
  //       const text = "Prof Joyner of King's College, London.";
  //       const result = translator.toAmerican(text);
  //       const expected = "Prof. Joyner of King's College, London.";
  //       assert.equal(result, expected);
  //     });

  //     test("Eg10", () => {
  //       const text = "Tea time is usually around 4 or 4.30.";
  //       const result = translator.toAmerican(text);
  //       const expected = "Tea time is usually around 4 or 4:30.";
  //       assert.equal(result, expected);
  //     });
  //   });
});
