const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

const { translateTitle } = require("../components/translator.js");

suite("Unit Tests", () => {
  suite("translateTitle", () => {
    test("Mr., to British", () => {
      const text = "Mr.";
      const result = translateTitle(text, true);
      const expected = '<span class="highlight">Mr</span>';
      assert.equal(result, expected);
    });

    test("Mr, toAmerican", () => {
      const text = "Mr";
      const result = translateTitle(text, false);
      const expected = '<span class="highlight">Mr.</span>';
      assert.equal(result, expected);
    });

    test("mr, toBritish", () => {
      const text = "mr";
      const result = translateTitle(text, true);
      const expected = "mr";
      assert.equal(result, expected);
    });

    test("mr., toAmerican", () => {
      const text = "mr.";
      const result = translateTitle(text, false);
      const expected = "mr.";
      assert.equal(result, expected);
    });

    test("Dr., toBritish", () => {
      const text = "Dr.";
      const result = translateTitle(text, true);
      const expected = '<span class="highlight">Dr</span>';
      assert.equal(result, expected);
    });
  });

  suite("Translate to British", () => {
    // test("Eg1", () => {
    //   const text = "Mangoes are my favorite fruit.";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'Mangoes are my <span class="highlight">favourite</span> fruit.';
    //   assert.equal(result, expected);
    // });
    // test("Eg2", () => {
    //   const text = "I ate yogurt for breakfast.";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'I ate <span class="highlight">yoghurt</span> for breakfast.';
    //   assert.equal(result, expected);
    // });
    // test("Eg3", () => {
    //   const text = "We had a party at my friend's condo.";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'We had a party at my friend\'s <span class="highlight">flat</span>.';
    //   assert.equal(result, expected);
    // });
    // test("Eg4", () => {
    //   const text = "Can you toss this in the trashcan for me?";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'Can you toss this in the <span class="highlight">bin</span> for me?';
    //   assert.equal(result, expected);
    // });
    // test("Eg5", () => {
    //   const text = "The parking lot was full.";
    //   const result = translator.toBritish(text);
    //   const expected = 'The <span class="highlight">car park</span> was full.';
    //   assert.equal(result, expected);
    // });
    // test("Eg6", () => {
    //   const text = "Like a high tech Rube Goldberg machine.";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'Like a high tech <span class="highlight">Heath Robinson device</span>.';
    //   assert.equal(result, expected);
    // });
    // test("Eg7", () => {
    //   const text = "To play hooky means to skip class or work.";
    //   const result = translator.toBritish(text);
    //   const expected =
    //     'To <span class="highlight">bunk off</span> means to skip class or work.';
    //   assert.equal(result, expected);
    // });

    test("Eg8", () => {
      const text = "No Mr. Bond, I expect you to die.";
      const result = translator.toBritish(text);
      const expected =
        'No <span class="highlight">Mr</span> Bond, I expect you to die.';
      assert.equal(result, expected);
    });

    test("Eg9", () => {
      const text = "Dr. Grosh will see you now.";
      const result = translator.toBritish(text);
      const expected =
        '<span class="highlight">Dr</span> Grosh will see you now.';
      assert.equal(result, expected);
    });

    test("Eg10", () => {
      const text = "Lunch is at 12:15 today.";
      const result = translator.toBritish(text);
      const expected =
        'Lunch is at <span class="highlight">12.15</span> today.';
      assert.equal(result, expected);
    });
  });

  suite("Translate to American", () => {
    //     test("Eg1", () => {
    //       const text = "We watched the footie match for a while.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'We watched the <span class="highlight">soccer</span> match for a while.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg2", () => {
    //       const text = "Paracetamol takes up to an hour to work.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg3", () => {
    //       const text = "First, caramelise the onions.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'First, <span class="highlight">caramelize</span> the onions.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg4", () => {
    //       const text = "I spent the bank holiday at the funfair.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg5", () => {
    //       const text = "I had a bicky then went to the chippy.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg6", () => {
    //       const text = "I've just got bits and bobs in my bum bag.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
    //       assert.equal(result, expected);
    //     });
    //     test("Eg7", () => {
    //       const text = "The car boot sale at Boxted Airfield was called off.";
    //       const result = translator.toAmerican(text);
    //       const expected =
    //         'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
    //       assert.equal(result, expected);
    //     });

    test("Eg8", () => {
      const text = "Have you met Mrs Kalyani?";
      const result = translator.toAmerican(text);
      const expected =
        'Have you met <span class="highlight">Mrs.</span> Kalyani?';
      assert.equal(result, expected);
    });

    test("Eg9", () => {
      const text = "Prof Joyner of King's College, London.";
      const result = translator.toAmerican(text);
      const expected =
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
      assert.equal(result, expected);
    });

    // test("Eg10", () => {
    //   const text = "Tea time is usually around 4 or 4.30.";
    //   const result = translator.toAmerican(text);
    //   const expected =
    //     'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
    //   assert.equal(result, expected);
    // });
  });

  //   suite("est highlight", () => {
  //     test("Eg1", () => {
  //       const text = "Mangoes are my favorite fruit.";
  //       const result = translator.toBritish(text);
  //       const expected =
  //         'Mangoes are my <span class="highlight">favourite</span> fruit.';
  //       assert.equal(result, expected);
  //     });

  //     test("Eg2", () => {
  //       const text = "I ate yogurt for breakfast.";
  //       const result = translator.toBritish(text);
  //       const expected =
  //         'I ate <span class="highlight">yoghurt</span> for breakfast.';
  //       assert.equal(result, expected);
  //     });

  //     test("Eg3", () => {
  //       const text = "We watched the footie match for a while.";
  //       const result = translator.toAmerican(text);
  //       const expected =
  //         'We watched the <span class="highlight">soccer</span> match for a while.';
  //       assert.equal(result, expected);
  //     });

  //     test("Eg4", () => {
  //       const text = "Paracetamol takes up to an hour to work.";
  //       const result = translator.toAmerican(text);
  //       const expected =
  //         '<span class="highlight">Tylenol</span> takes up to an hour to work.';
  //       assert.equal(result, expected);
  //     });
  //   });
});
