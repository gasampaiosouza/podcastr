# getStaticPaths

it builds your website in a static way

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    //...
  }
}
```

### Params

Receives all of the pages that you want it to generate statically

```ts
  return {
    paths: [
      { params: { [id]: '1' } },
      // or
      { params: { [id]: '/my-page/to-be-static' } }
    ],
    // ...
  }
```

### Fallback

Everything that is *not defined* inside `params`, will be generated using the fallback mode you define.

`false`: Return **not found - 404**;
`true`: Get visited page data, fetches it on the *client side*;
`blocking`: same as true, but fetches the data on the *server-side*; - **Recommended**

> Incremental static regeneration