namespace capstone_HRAgency.Controllers
{
    internal class AuthenticationFailureResult
    {
        private string v;
        private HttpRequestMessage request;

        public AuthenticationFailureResult(string v, HttpRequestMessage request)
        {
            this.v = v;
            this.request = request;
        }
    }
}