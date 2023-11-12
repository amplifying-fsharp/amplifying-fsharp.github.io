---
title: Seemless switching between Package and Project references
date: 2023-11-11
author: "dawe"
slug: "2023/11/11"
---

## Switching seemlessly between Package and Project references - 2023-11-11

##### by dawe

While doing open source development on a code base with package dependencies which are crucial to your work, you easily run into a situation where you want to adjust the package code to your needs. Reasons could be a missing feature, a bug, or just a different opinion on how things should be done.  
Depending on the nature of your work, you might want to do the changes in the upstream code and consume them right away in the consuming project to finish your original work. This has also the benefit that you see the impact of your changes right away and can adjust them if needed.

We had such a situation recently while working on the [Ionide-Analyzers](https://github.com/ionide/ionide-analyzers). There was a bug in the [FSharp.Analyzers.SDK](https://github.com/ionide/FSharp.Analyzers.SDK) blocking [Florian](https://www.youtube.com/live/H7w4NfF6xsg?si=kuCL3CcevR5Bsqgg&t=1406) from finishing his analyzer.
As our analyzer initiative is still under heavy development, we anticipate to run into this situation more often in the future. So we decided to make it as easy as possible to switch between package and project references to the SDK. Depending on how you consume packages in your project, there are multiple ways to do this. I will show you a convenient way to do this with nuget and MSBuild.

### The setup

Create a separate ItemGroup for the packages you want to switch between package and project references. In our case this is the FSharp.Analyzers.SDK and FSharp.Analyzers.SDK.Testing packages.

```xml
<ItemGroup Condition="'$(UseLocalAnalyzersSDK)' == 'false'">
<PackageVersion Include="FSharp.Analyzers.SDK" Version="[0.19.0]" />
<PackageVersion Include="FSharp.Analyzers.SDK.Testing" Version="[0.19.0]" />    
</ItemGroup>
```

As you can see in the `Condition` attribute, we use a property `UseLocalAnalyzersSDK` to control whether we want to use the package or the project reference. We have to define this property in the `Directory.Build.props` file inside a `PropertyGroup`. Right next to it, we also define the path to the local repo of the SDK. This is needed to resolve the project reference when we switch to it.

```xml
<!-- Set to true and adjust the path to your local repo if you want to use that instead of the nuget packages -->
<UseLocalAnalyzersSDK>false</UseLocalAnalyzersSDK>
<LocalAnalyzersSDKRepo>../../../FSharp.Analyzers.SDK</LocalAnalyzersSDKRepo>
```

The last needed change is to adjust the individual `.fsproj` files or the [Directory.Build.props](https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022) file if applicable to your solution. We have to enable/disable the usage of the package and project reference depending on the value of the `UseLocalAnalyzersSDK` property. Create dedicated `ItemGroup` entries for that:

```xml
<ItemGroup Condition="'$(UseLocalAnalyzersSDK)' == 'true'">
    <ProjectReference Include="$(LocalAnalyzersSDKRepo)/src/FSharp.Analyzers.SDK/FSharp.Analyzers.SDK.fsproj" />
</ItemGroup>

<ItemGroup Condition="'$(UseLocalAnalyzersSDK)' == 'false'">
    <PackageReference Include="FSharp.Analyzers.SDK"/>
</ItemGroup>
```

That's it. Now you can switch between package and project references by setting the `UseLocalAnalyzersSDK` property to `true` or `false` and pointing the `LocalAnalyzersSDKRepo` property to your local repo of the SDK. You can see the full PR [here](https://github.com/ionide/ionide-analyzers/pull/18). Enjoy seemless hacking and don't forget to contribute back to the upstream repo.
