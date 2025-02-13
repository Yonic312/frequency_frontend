module.exports = {
    presets: [
      "react-app" // React 프로젝트에 맞는 Babel preset
    ],
    plugins: [
      "@babel/plugin-proposal-private-methods", // private 메서드를 지원하기 위한 플러그인
      "@babel/plugin-proposal-private-property-in-object" // private 프로퍼티를 객체에서 사용할 수 있도록 해주는 플러그인
    ]
  };
  