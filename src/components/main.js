export default function Main({ children }) {
  return (
    <html>
      <head>
        <title>Users Profile</title>
      </head>
      <body>
        <nav>
          <input type="text" placeholder="Search users by name" />
          <hr/>
          <ul>
            <li>
              <a href="/"> Home </a>
            </li>
            <li>
              <a href="/users"> Users </a>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
