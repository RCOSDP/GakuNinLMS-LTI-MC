import {
  Equals,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";

/** LTI v1.3 Message Claims */
export class LtiClaims {
  constructor(props?: Partial<LtiClaims>) {
    Object.assign(this, {
      ...props,
      "https://purl.imsglobal.org/spec/lti/claim/resource_link":
        new ResourceLinkClaim(
          props?.["https://purl.imsglobal.org/spec/lti/claim/resource_link"]
        ),
      "https://purl.imsglobal.org/spec/lti/claim/context": new ContextClaim(
        props?.["https://purl.imsglobal.org/spec/lti/claim/context"]
      ),
      "https://purl.imsglobal.org/spec/lti/claim/launch_presentation":
        new LaunchPresentationClaim(
          props?.[
            "https://purl.imsglobal.org/spec/lti/claim/launch_presentation"
          ]
        ),
    });
  }
  @Equals("LtiResourceLinkRequest")
  "https://purl.imsglobal.org/spec/lti/claim/message_type"!: "LtiResourceLinkRequest";
  @Equals("1.3.0")
  "https://purl.imsglobal.org/spec/lti/claim/version"!: "1.3.0";
  @IsNotEmpty()
  @MaxLength(255)
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id"!: string;
  @IsNotEmpty()
  "https://purl.imsglobal.org/spec/lti/claim/target_link_uri"!: string;
  @IsNotEmpty()
  @ValidateNested()
  "https://purl.imsglobal.org/spec/lti/claim/resource_link"!: ResourceLinkClaim;
  @IsNotEmpty()
  @IsString({ each: true })
  "https://purl.imsglobal.org/spec/lti/claim/roles"!: string[];
  @IsNotEmpty() // TODO: 依存している実装箇所が存在するため必須にしているが本来任意なので修正したい
  @ValidateNested()
  "https://purl.imsglobal.org/spec/lti/claim/context"!: ContextClaim;
  @IsOptional()
  "https://purl.imsglobal.org/spec/lti/claim/tool_platform"?: unknown;
  @IsOptional()
  "https://purlimsglobal.org/spec/lti/claim/role_scope_mentor"?: unknown;
  @IsOptional()
  @ValidateNested()
  "https://purl.imsglobal.org/spec/lti/claim/launch_presentation"?: LaunchPresentationClaim;
  @IsOptional()
  "https://purl.imsglobal.org/spec/lti/claim/lis"?: unknown;
  @IsOptional()
  "https://purl.imsglobal.org/spec/lti/claim/custom"?: unknown;
}

class ResourceLinkClaim {
  constructor(props?: Partial<ResourceLinkClaim>) {
    Object.assign(this, props);
  }
  @IsNotEmpty()
  @IsString()
  id!: string;
  @IsOptional()
  @IsString()
  title?: string;
}

class ContextClaim {
  constructor(props?: Partial<ContextClaim>) {
    Object.assign(this, props);
  }
  @IsNotEmpty()
  @IsString()
  id!: string;
  @IsOptional()
  @IsString()
  label?: string;
  @IsOptional()
  @IsString()
  title?: string;
}

class LaunchPresentationClaim {
  constructor(props?: Partial<LaunchPresentationClaim>) {
    Object.assign(this, props);
  }
  @IsOptional()
  @IsString()
  return_url?: string;
}
