const React = require("react")
const { RecoilRoot } = require("recoil")

// Adds a class name to the body element

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  return <RecoilRoot {...props}>{element}</RecoilRoot>
}