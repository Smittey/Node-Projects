#npm-registry-publisher

The purpose of this script is to traverse your project for node modules. For every module found it will pack and publish the module to your registry using `npm publish`. 

###Motivation###

My day job consists of writing meteor applications entirely offline. Once the meteor application has been compiled into a Node.js project, a registry has to be used to stop npm from using the public registry at http://registry.npmjs.org. The initial registry repository population can be painful, and this project aims to eliminate that by doing it for you. It also uses no additional dependencies. 

###Usage###

```
Usage: example [options]
  -d, --directory:    
      Path to the directory you want to traverse for node modules.
  -r, --registry: [optional]
      The url of your private registry. 
      If not specified it will default to the registry specified in your npmrc config.
```

###Examples###

`node index.js -d C:\dir\to\node\project\`

`node index.js -d C:\dir\to\node\project\ -r http://localhost:8081/nexus/content/repositories/npm/`

`node index.js --directory C:\dir\to\node\project\ --registry http://localhost:8081/nexus/content/repositories/npm/`
