function AnimatedIcon() {
  const myAnimatedSailHtml = require('../Loadingpage/waves.html');

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: myAnimatedSailHtml }}></div>
      <img src="waves.html" alt="MySail" />
      {/* other content */}
    </div>
  );
}

export default AnimatedIcon

