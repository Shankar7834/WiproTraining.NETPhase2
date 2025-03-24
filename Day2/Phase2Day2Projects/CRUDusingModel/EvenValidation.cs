using System.ComponentModel.DataAnnotations;

namespace CRUDusingModel
{
    public class EvenValidation:ValidationAttribute
    {

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value != null)
            {

                int value1 = Convert.ToInt32(value);

                if (value1 % 2 == 0)
                {
                    return ValidationResult.Success;
                }



            }
            return new ValidationResult("Please enter only age of even numbers ");

        }
    }
}
