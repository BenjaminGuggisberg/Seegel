function MyComponent() {
  const myAnimatedSailHtml = require('./public/animated_icon.html');

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: myAnimatedSailHtml }}></div>
      <img src="waves.html" alt="MySail" />
      {/* other content */}
    </div>
  );
}

