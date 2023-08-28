import { 
    Outlet, 
    Link,
    useLoaderData,
    Form
} from "react-router-dom";

import { getCreators, createCreator } from "../creators";

export async function loader() {
    const creators = await getCreators();
    return { creators };
}

export async function action() {
    const creator = await createCreator();
    return { creator };
  }

export default function Root() {
    const { creators } = useLoaderData();
    return (
      <>
        <div id="sidebar">
          <h1>CodePath Creators</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search Creators"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {creators.length ? (
                <ul>
                {creators.map((creator) => (
                    <li key={creator.id}>
                    <Link to={`creators/${creator.id}`}>
                        {creator.first || creator.last ? (
                        <>
                            {creator.first} {creator.last}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}{" "}
                        {creator.favorite && <span>★</span>}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No creators</i>
                </p>
            )}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }