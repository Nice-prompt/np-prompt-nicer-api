import app from './app';

// PORT
const PORT = process.env.PORT || 8081;

// Listen on port 8081
app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}!`)
);