using Microsoft.AspNetCore.Mvc;
using Search.Model;

namespace Search.Controllers;

[ApiController]
[Route("[controller]")]
public class HslRoutesController : ControllerBase
{
    [HttpGet]
    public HslRoutesResponse Get()
    {
        return new HslRoutesResponse();
    }
}
