import app from "./app";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if(process.env.NODE_ENV === "test"){
    console.log(`Server is on test mode. port : ${PORT}`)
  }else{
  console.log(`Server is listening on port ${PORT}.`);
  }
});
