export default {
  input: "openapi.json",
  output: "src/client",
  client: "axios",
  name: "GeneratedProcurat",
  useOptions: true,
  services: {
    asClass: true,
  },
}