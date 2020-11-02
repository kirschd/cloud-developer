import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  
  //DK:dev - implement filteredimage?param={{}}
  app.get("/filteredimage", async(req, res) => {
    console.log("filteredimage - processing..");

    //destruct body payload for vars -
    let { image_url } =  req.query;
    // check for url of image to process - return & exit w/400 msg if not present
    if ( !image_url )
      return(res.status(400).send('ERROR: image_url is required. Try again.'));

    //log req.query - debug
    console.log("input: "+ image_url);

    //DK:dev - pass image url to filter -
    let myFilteredImage:string = await filterImageFromURL(image_url);

    if(myFilteredImage) {
      //res.writeHead('Content-type' : 'image/jpg');
      await res.sendFile(myFilteredImage, )
      console.log("output: " + myFilteredImage);

      //delete local filtered files after done
      res.on("finish", () => deleteLocalFiles([myFilteredImage]));
    }
  })
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
