first create two folders like this one is Boilerplatecodeinlocal  and passedcodeinlocal

and after this open the notes of saturday ..Day8codeshare notes there i had taught about context and reducers so for reference keep it open .
also open App.test.js file side by to check and implement test cases and also open the quesstion description as well to understand the 
question 

so now all these folders and 2 files from here and 1 file from day8 code share u can check it 


now copy the content of passed code in local and in boilerplatecodeinlocal by proper understanding and u can copy the app.test.js 
file code into passed code also so here both code are generated from npx create app only and only thing is code of boiler plate and 
passed code is pasted in important files so proeprly understanding one by one fill the code and fill the boiler plate code 
so that test case pass of boilerplatecodeinlocal also 

so pracise 2 or 3 times to get more understanding.

do npm install in both files and do coding as well 



IdentityDemoWithTokens in web api 
-------------------------------------
Now Open one asp.net core  web api application of net core of 8.0 version

Add these depencies of version 8.0.13 

Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.AspNetCore.Authentication.JwtBearer


after installing this once build the project once
add one folder into the project with the name Models in that add Authentication folder and in
that add one Login and SignUp folder again

Solution 'User.Management.API' (2 of 2 projects)
└── User.Management.API
    ├── Connected Services
    ├── Dependencies
    ├── Properties
    ├── Controllers
    ├── Migrations
    ├── Models
    │   ├── Authentication
    │   │   ├── Login
    │   │   │   └── LoginModel.cs
    │   │   ├── SignUp
    │   │   │   └── RegisterUser.cs
    │   ├── ApplicationDbContext.cs
    │   ├── Response.cs
    ├── .editorconfig
    ├── appsettings.json
    ├── GlobalSuppressions.cs
    ├── Program.cs
└── User.Management.Service
    ├── Dependencies
    ├── Models
    │   ├── EmailConfiguration.cs
    │   ├── Message.cs
    ├── Services
    │   ├── GlobalSuppressions.cs



then create a class with the name RegisterUser.cs 
using System.ComponentModel.DataAnnotations;

namespace IdentityDemowithTokeninCore.Models.Authentication.SignUp
{
    public class RegisterUser
    {

        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}

go to app settings and add the configuration like this 

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=LAPTOP-4G8BHPK9\\SQLEXPRESS;Database=UserMgDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}

add a new class in Models folder in ApplicationDbContext

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IdentityDemowithTokeninCore.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>
        options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

in progam cs file 
-------------------
 builder.Services.AddDbContext<ApplicationDbContext>
     (options =>options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

 // For Identity
 builder.Services.AddIdentity<IdentityUser, IdentityRole>()
 .AddEntityFrameworkStores<ApplicationDbContext>()
 .AddDefaultTokenProviders();

 // adding basic authentication
 builder.Services.AddAuthentication(options =>
 {
     options.DefaultAuthenticateScheme =
     JwtBearerDefaults.AuthenticationScheme;
     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
 });

Now run the migrations 

build the solution once then run migration 
add-migration 'intiasetup'
update-database 

so like this some empty  identity tables will be created

now in ApplicationDbContext add roles and agin run migration and update database to see the roles in aspnetroles table okay 

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace IdentityDemowithTokeninCore.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>
        options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
        }

        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
            (
            new IdentityRole()
            {
                Name = "Admin",
                ConcurrencyStamp = "1",
                NormalizedName = "Admin"
            },
            new IdentityRole()
            {
                Name = "User",
                ConcurrencyStamp = "2",
                NormalizedName = "User"
            },
            new IdentityRole()
            {
                Name = "HR",
                ConcurrencyStamp = "3",
                NormalizedName = "HR"
            }
            );
        }
    }
}
so roles are added now next users i have to create and login i have to do 

and add one class into the Models folder with the name Response.cs

namespace IdentityDemowithTokeninCore.Models
{
    public class Response
    {
        public string? Status { get; set; }
        public string? Message { get; set; }

    }
}

next add AuthController in controller folder of empty of api type only add it 


 private readonly UserManager<IdentityUser> _userManager;
 private readonly SignInManager<IdentityUser> _signInManager;
 private readonly RoleManager<IdentityRole> _roleManager;

 private readonly IConfiguration _configuration;

 public AuthController(UserManager<IdentityUser> userManager,
     RoleManager<IdentityRole> roleManager,
     SignInManager<IdentityUser> signInManager, IConfiguration configuration)
 {
     _userManager = userManager;
     _roleManager = roleManager;
     _signInManager = signInManager;

     _configuration = configuration;
 }


 [HttpPost]
 public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
 {
     //Check User Exist 
     var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
     if (userExist != null)
     {
         return StatusCode(StatusCodes.Status403Forbidden,
             new Response { Status = "Error", Message = "User already exists!" });
     }

     //Add the User in the database
     IdentityUser user = new()
     {
         Email = registerUser.Email,
         SecurityStamp = Guid.NewGuid().ToString(),
         UserName = registerUser.Username

     };
     if (await _roleManager.RoleExistsAsync(role))
     {
         var result = await _userManager.CreateAsync(user, registerUser.Password);
         if (!result.Succeeded)
         {
             return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = "User Failed to Create" });
         }
         //Add role to the user....

         await _userManager.AddToRoleAsync(user, role);





         return StatusCode(StatusCodes.Status200OK,
             new Response { Status = "Success", Message = $"User created SuccessFully" });

     }
     else
     {
         return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = "This Role Doesnot Exist." });
     }


 }

so righ now AuthControllr will look like tis complete code 

using IdentityDemowithTokeninCore.Models.Authentication.SignUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using IdentityDemowithTokeninCore.Models;

namespace IdentityDemowithTokeninCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;

        public AuthController(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

            _configuration = configuration;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User already exists!" });
            }

            //Add the User in the database
            IdentityUser user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username

            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User Failed to Create" });
                }
                //Add role to the user....

                await _userManager.AddToRoleAsync(user, role);





                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = $"User created SuccessFully" });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This Role Doesnot Exist." });
            }


        }


    }
}

once build the solution and then
Run the web api an insert one value of the user
Now i need to work on login method

now add this model into login folder 

using System.ComponentModel.DataAnnotations;

namespace IdentityDemowithTokeninCore.Models.Authentication.Login
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}


and then go to app settings and write the JWT ..code here

"JWT": {
  "ValidAudience": "https://localhost:3000",
  "ValidIssuer": "https://localhost:7277",   
  "Secret": "JWTAuthenticationHIGHsecuredPasswordVVVp1OHsssssdddasd7Xzyrsss"
}


will look like tis my port is 7277

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=LAPTOP-4G8BHPK9\\SQLEXPRESS;Database=UserMgDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JWT": {
    "ValidAudience": "https://localhost:3000",
    "ValidIssuer": "https://localhost:7277",
    "Secret": "JWTAuthenticationHIGHsecuredPasswordVVVp1OHsssssdddasd7Xzyrsss"
  }

}

Now in the controller i have to add login method and before that jwt token method which will create token by taking some credentials of user 

check the wanted code from complete code 

using IdentityDemowithTokeninCore.Models.Authentication.SignUp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using IdentityDemowithTokeninCore.Models;
using IdentityDemowithTokeninCore.Models.Authentication.Login;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IdentityDemowithTokeninCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;

        public AuthController(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

            _configuration = configuration;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User already exists!" });
            }

            //Add the User in the database
            IdentityUser user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username

            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User Failed to Create" });
                }
                //Add role to the user....

                await _userManager.AddToRoleAsync(user, role);





                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = $"User created SuccessFully" });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This Role Doesnot Exist." });
            }


        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddYears(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }


                var jwtToken = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                });
                //returning the token...

            }
            return Unauthorized();


        }




    }
}


Now Program.cs file further jwt code is written like this and for authorize button in swagger i am
writing some code in the middleware because in swagger authorize button is not there like
postman so explicitly u have to add code and finally down u have to add one method which is
app.UseAuthentication();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
  // from here copy 
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
{
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type=ReferenceType.SecurityScheme,
                Id="Bearer"
            }
        },
        new string[]{}
    }
});
        });


so you are seeing some comment in program.cs file afte tat comment and after one line add tis code then my program.cs will look like this 


using IdentityDemowithTokeninCore.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Configuration;
using System.Text;
namespace IdentityDemowithTokeninCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // For Entity Framework
            var configuration = builder.Configuration;
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            // For Identity
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();


            // Add services to the container.

            builder.Services.AddControllers();
            // adding basic authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                };
            }); ;
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
            });
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}



next add one contorller with name AdminController which will return just some string values of employes 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IdentityDemowithTokeninCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("employees")]
        public IEnumerable<string> Get()
        {
            return new List<string> { "santosh", "Ali", "sita" };
        }
    }
}

Now we can test the application 

I tried to log in from web API swagger a token was generated so using this token I can touch admin employees controller but I have not kept
 authorised attribute on top of admin controller So anybody can touch admin controller which is having some set of employees it is
     written now I will make it authorised

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace IdentityDemowithTokeninCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("employees")]
        public IEnumerable<string> Get()
        {
            return new List<string> { "santosh", "Ali", "sita" };
        }
    }
}
now again dont  login first frist try to toucn Admin controller or try to call admincontroller get method it will give 401 error 
  unauthorized so i have to login and then send the token to authorize section and then i can touuch 
        AdminController and i am having one user only who is admin
Now another user I will create who is HR as a role now I will change the controller by providing role as admin

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace IdentityDemowithTokeninCore.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class AdminController : ControllerBase
    {
        [HttpGet("employees")]
        public IEnumerable<string> Get()
        {
            return new List<string> { "santosh", "Ali", "sita" };
        }
    }
}

now When I log in with HR role some token will be created for that HR role using that if you try to assess admin controller it 
    will give 403 error that is role based error it will say that I want the token of admin user only  token only I want

Try to add users with different roles try to login with different tokens and
    see how this one tokens were based upon roles for authentication 401 error 
        without token for roles 403 error token but with not the valid role token 
