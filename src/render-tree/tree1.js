// Slightly simplified
exports.treeOne = {
  $$typeof: Symbol.for("react.element"), // Tells React it's a JSX element (e.g. <html>)
  type: 'html',
  props: {
    children: [
      {
        $$typeof: Symbol.for("react.element"),
        type: 'head',
        props: {
          children: {
            $$typeof: Symbol.for("react.element"),
            type: 'title',
            props: { children: 'My blog' }
          }
        }
      },
      {
        $$typeof: Symbol.for("react.element"),
        type: 'body',
        props: {
          children: [
            {
              $$typeof: Symbol.for("react.element"),
              type: 'nav',
              props: {
                children: [{
                  $$typeof: Symbol.for("react.element"),
                  type: 'a',
                  props: { href: '/', children: 'Home' }
                }, {
                  $$typeof: Symbol.for("react.element"),
                  type: 'hr',
                  props: null
                }]
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'article',
              props: {
                children: "postContent: user posted something about react SSR and RSC deep dive"
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'footer',
              props: {
                /* ...And so on... */
              }              
            }
          ]
        }
      }
    ]
  }
}