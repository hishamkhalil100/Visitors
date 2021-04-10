using System;
using System.Collections.Generic;
using System.Linq;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;



public class ActiveDirectoryManagment
{
 

    public static bool ValidateUser(string userName, string password)
    {
        PrincipalContext pc = new PrincipalContext(ContextType.Domain, "kfnl.gov.sa");
        // validate the credentials
        bool isValid = pc.ValidateCredentials(userName, password);
        pc.Dispose();
        return isValid;
    }

    public List<Users> GetAdUsersByGroup(string filter)
    {

        try
        {
            List<Users> lstAdUsers = new List<Users>();
            string DomainPath = "LDAP://DC=kfnl,DC=gov,DC=sa";
            DirectoryEntry searchRoot = new DirectoryEntry(DomainPath);
            DirectorySearcher search = new DirectorySearcher(searchRoot);
            search.Filter = "(&(objectClass=user)(objectCategory=person)(memberOf=" + filter + "))";
            search.PropertiesToLoad.Add("samaccountname");
            search.PropertiesToLoad.Add("mail");
            search.PropertiesToLoad.Add("usergroup");
            //     search.PropertiesToLoad.Add("password");
            search.PropertiesToLoad.Add("displayname");//first name
            SearchResult result;
            SearchResultCollection resultCol = search.FindAll();

            if (resultCol != null)
            {
                for (int counter = 0; counter < resultCol.Count; counter++)
                {
                    string userNameEmailString = string.Empty;
                    result = resultCol[counter];
                    if (result.Properties.Contains("samaccountname") &&
                             result.Properties.Contains("mail") &&
                        result.Properties.Contains("displayname"))
                    {
                        Users objSurveyUsers = new Users();
                        objSurveyUsers.Email = (String)result.Properties["mail"][0] +
                          "^" + (String)result.Properties["displayname"][0];
                        objSurveyUsers.UserName = (String)result.Properties["samaccountname"][0];
                        objSurveyUsers.DisplayName = (String)result.Properties["displayname"][0];
                        lstAdUsers.Add(objSurveyUsers);
                    }
                }
            }
            return lstAdUsers;
        }
        catch (Exception ex)
        {
            Helper.LogError(ex);
            return null;
        }
    }
    public static string GetDepartment(string username)
    {
        string result = string.Empty;

        // if you do repeated domain access, you might want to do this *once* outside this method, 
        // and pass it in as a second parameter!
        PrincipalContext yourDomain = new PrincipalContext(ContextType.Domain);

        // find the user
        UserPrincipal user = UserPrincipal.FindByIdentity(yourDomain, username);

        // if user is found
        if (user != null)
        {
            // get DirectoryEntry underlying it
            DirectoryEntry de = (user.GetUnderlyingObject() as DirectoryEntry);
            if (de != null)
            {
                if (de.Properties.Contains("memberOf"))
                {
                    var q = new VisitorsDataContext().GetAllDepartments().ToArray<GetAllDepartmentsResult>();
                    for (int i = 0; i < de.Properties["memberOf"].Count; i++)
                    {
                        foreach (var item in q)
                        {
                            result = de.Properties["memberOf"][i].ToString();
                            if (result.Equals(item.Department_Domain))
                            {
                                return result;
                            }
                        }
                    }
                }
            }
        }
        return null;

    }

}
