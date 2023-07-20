using GraphQL.Client.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Search.Model;
using Search.Services;

namespace Search.Controllers;

[ApiController]
[Route("[controller]")]
public class HslRoutesController : ControllerBase
{
    private readonly ILogger<HslRoutesController> _logger;
    private readonly HslRoutesService _service;

    public HslRoutesController(HslRoutesService service, ILogger<HslRoutesController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    [Route("search/{term}")]
    public async Task<ActionResult> SearchRoutes(string term)
    {
        try
        {
            var res = await _service.GetHslRoutes(term);
            _logger.LogInformation("Endpoint SearchRoutes successfully called");
            return Ok(res);
        }
        catch (GraphQLHttpRequestException ex)
        {
            _logger.LogError("Error occurred. Content: {ex.Content}, Message: {ex.Message}", ex.Message, ex.Content);
            return BadRequest();
        }
        catch (Exception ex)
        {
            _logger.LogError("{ex.Message}", ex.Message);
            return StatusCode(500);
        }
    }
}
