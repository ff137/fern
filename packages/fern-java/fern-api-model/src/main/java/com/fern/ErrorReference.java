package com.fern;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fern.immutables.StagedBuilderStyle;
import com.fern.interfaces.IWithDocs;
import java.lang.String;
import org.immutables.value.Value;

@Value.Immutable
@StagedBuilderStyle
@JsonDeserialize(
    as = ImmutableErrorReference.class
)
@JsonIgnoreProperties({"_type"})
public interface ErrorReference extends IWithDocs {
  String discriminantValue();

  NamedError error();

  static ImmutableErrorReference.DiscriminantValueBuildStage builder() {
    return ImmutableErrorReference.builder();
  }
}
