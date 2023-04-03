const fs = require("fs");
const superagent = require("superagent"); //has support for promises out of the box

//helper function to promisfy our logic
const readFilePro = (file) => {
  //Promise takes in a executer function that immediatley executes when this Promise is Available
  //and where we do our async logic
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file👨‍💻");
      resolve(data); //value that the promise will returm
    });
  });
};

//write a file but it really doesnt return anything in our resolve()
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file");
      resolve("Success!!");
    });
  });
};

//async await allows us to make our code look more synchronous w/o so many callbacks
const getDogPic = async () => {
  try {
    //waiting for a promised value then storing it into a variable
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    //when we choose not to await it saves the value into a variable rather than trying to get a resolved value
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    //pass an array with all resolved values to the Promise.all
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message)
    console.log(imgs);

    await writeFilePro("dog-img.txt", imgs.join('\n'));
    console.log("Random dog image saved to file!")
  } catch (err) {
    console.log(err.status)
    throw err;
  }
  return "2: Ready 🐶" //the returned resolved promise value we want when we await this whole function
}

//IIFE way
(async () => {
  try {
    console.log("1: will get dog pics");
    const x = await getDogPic(); //will be the above returned resolved string from our async function
    console.log(x);
    console.log("3: Done Getting dog pics");
  } catch (err) {
    console.log("ERROR 💥🧨");
  }
})();

/*
console.log("1: will get dog pics")
//offloads fn() in background then skips this line
//then is the future pending promise value we will eventually return
getDogPic().then(x => {
  console.log(x)
  console.log("3: done getting dog pics")
})
  .catch((err) => {
    console.log("ERROR 💥🧨")
  });
  /// ===>
*/
//the key is to return a promise in each then() so that it can be fed into the next then until we are finished setting/getting data
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);

    //the retriever text getting fed into this request and returns a promise
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    //this res value is the value that is getting returned above and is now in this new ev
    //pending promise successful resolve
    console.log(res.body.message); //the retriever image response we get for the client from the api on the response body
    //write a new randow image url from our response into this dog-img.txt file
    return writeFilePro("dog-img.txt", res.body.message); //writes url to this file
    // fs.writeFile("dog-img.txt", res.body.message, (err) => {
    //   if (err) return console.log(err.message);
    //   console.log("random dog image saved to file");
    // });
  })
  .then(() => {
    console.log("Random dog image saved to file!");
  })
  .catch((err) => {
    //reject case when errors occur
    console.log(err.status);
  });
// //The __dirname string gives the directory path of the current module,
// //this is also similar to that of path.dirname() of the filename.
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {});
*/
