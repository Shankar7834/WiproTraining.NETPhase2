using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TagHelperdemo1.Models;

namespace TagHelperdemo1.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Register()
        {
            // Prepopulate the country list
            var model = new UserViewModel
            {
                
                CountryList = GetCountryList() // Helper method to get the country list
            };

            return View(model);
        }


        [HttpPost]
        public IActionResult Register(UserViewModel model)
        {
            // Always repopulate the CountryList before returning the view
           model.CountryList = GetCountryList();
            ModelState.Remove("CountryList");
            if(ModelState.IsValid)
            {
                ViewBag.status = "registration succesfful";
            }
            else
            {
                ViewBag.status = "registration not  succesfful";
            }
            return View(model);

        }
        private List<SelectListItem> GetCountryList()
        {
            return new List<SelectListItem>
        {
            new SelectListItem { Value = "US", Text = "United States" },
            new SelectListItem { Value = "CA", Text = "Canada" },
            new SelectListItem { Value = "IN", Text = "India" }
        };
        }
    }
}
