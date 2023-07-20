using System.Text.Json;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Search.Model;

namespace Search.Services;

public class HslRoutesService
{
    private readonly IConfiguration _configuration;
    public HslRoutesService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<HslRoutesData> GetHslRoutes(string term)
    {
        using var graphQLClient = new GraphQLHttpClient("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql", new NewtonsoftJsonSerializer());

        var hslRoutesReq = new GraphQLRequest
        {
            Query = @"{
                        routes (name: """ + term + @""") {
                            gtfsId
                            shortName
                            longName
                            mode
                        }
                    }"
        };
        graphQLClient.HttpClient.DefaultRequestHeaders.Add("digitransit-subscription-key", _configuration.GetValue<string>("HSL_API_KEY"));
        var graphQLResponse = await graphQLClient.SendQueryAsync<HslRoutesData>(hslRoutesReq);
        return graphQLResponse.Data;
    }
}