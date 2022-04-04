package com.fern;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fern.immutables.StagedImmutablesStyle;
import org.immutables.value.Value;

import java.util.List;

@Value.Immutable
@StagedImmutablesStyle
@JsonDeserialize(as = ImmutableIntermediateRepresentation.class)
public interface IntermediateRepresentation {

    List<TypeDefinition> types();

    Services services();

    static ImmutableIntermediateRepresentation.ServicesBuildStage builder() {
        return ImmutableIntermediateRepresentation.builder();
    }

}
