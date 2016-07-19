An attempt to create the magic of https://github.com/reactjs/react-router/blob/master/examples/auth-with-shared-root/ but using a rouges gallery of javascript libraries.

The webpack config for this app is kind of overkill, it mostly represents the tools that I use but also tosses in some loaders and tools that I want to use in the near future.
I have seperated the config into several different files including one for all the constants. There are two sets of `.env` files for handling the env files, one to be used within the config.

As I was going through the example, I noticed that react-router uses setState on components and thus needs to use callbacks on the `auth.js` file as well as attempting to set the `onChange` method of the `auth` module within the component. Instead, I am trying to build the fake auth API using a Promise that wraps around `setTimeout` for `login`. Because we no longer need to use `setState`, I decided to use `redux` for state management, `react-router-redux` for dispatching changes to `location` as actions.

I have a login flow that I need to implement, in this case it is quite simply. Usually, one would be expected to send their `apiKey`, OAUTH 2.0 accessToken or JWT with every request, deal with expiration in the latter case among other things. So, I am testing my understanding of `redux-saga` to create the flow and perform side-effects like calling the auth API to login, logout and set the token in localStorage.
