using System.ComponentModel.DataAnnotations;

namespace TagHelperDemo2.Models
{
    public class UserViewModel
    {

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; }
    }
}
