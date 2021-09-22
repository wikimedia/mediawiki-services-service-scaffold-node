# Project status

The idea behind service-scaffold-node is to separate the existing service-template-node into two parts: a bare bones scaffolding project and a related npm package library (servicelib-node) with individual modules. With minimal opinionated implementation details, the scaffolding project will allow the developer to explicitly import desired functionality from modules within servicelib-node.


## To Do:
### Remove service-runner
service-runner is an npm package created at the Wikimedia Foundation enabling Node.js services to scale up, by spinning up multiple workers, in an otherwise single-threaded environment. It also handles logging, monitoring, and rate-limiting. 

After an informal discussion with service-ops, it was determined that service-runner is no longer necessary now that services at WMF will be running in Kubernetes. Kubernetes can now handle scaling up services in reponse to higher loads. The logging and monitoring it currently handles will be put into servicelib-node, and the API Gateway is capable of handling the rate limiting.

#### Pros
- Removing a complex, difficult to maintain library. The less code, the better. 
- Removing code that is tightly coupled and dependent largely on service-template-node structure

#### Cons
- service-runner can spin up new workers faster than Kubernetes can spin up another instance to support higher loads. 
- With more pods come more resource utilization per-pod (e.g. more sidecars, more memory usage, etc. ) We would now be looking at a 1:1 k8s pod to worker ratio, as opposed to N:1 workers to pod ratio.

### Ideas to explore:
- Use an off-the-shelf worker coordinator
- Create an instance of Envoy to route requests to and from multiple containers

