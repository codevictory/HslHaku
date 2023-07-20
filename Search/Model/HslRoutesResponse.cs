namespace Search.Model;

public class HslRoutesData
{
    public List<HslRouteInfo>? Routes { get; set; }
}


public class HslRouteInfo
{
    public string? GtfsId { get; set; }
    public string? ShortName { get; set; }
    public string? LongName { get; set; }
    public string? Mode { get; set; }
}