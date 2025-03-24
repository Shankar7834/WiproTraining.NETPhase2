using Microsoft.AspNetCore.Mvc;
using TagHelperDemo2.Models;
namespace TagHelperDemo2.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            UserViewModel model = new UserViewModel();
            // Render the form for registration
            return View(model);
        }

        [HttpPost]
        public IActionResult Register(UserViewModel model)
        {
            if (ModelState.IsValid)
            {
                TempData["Message"] = "Registration successful!";
                return RedirectToAction("Register");
            }

            // Return the view with validation errors
            return View(model);
        }
    }
}
