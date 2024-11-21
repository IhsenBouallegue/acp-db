import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { machines, manufacturingSites } from "@/data/master-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const metalstripschema = z.object({
  width: z.number(),
  thickness: z.number(),
  elongation: z.number(),
  symmetry: z.string(),
  preMaterialQuality: z.string(),
  preMaterialThickness: z.number(),
  preMaterialWidth: z.number(),
  coating: z.string(),
  materialWeight: z.number(),
  elongationPercentage: z.number(),
  tearStrength: z.number(),
  applicationInfo: z.string(),
  designNumber: z.string(),
  manufacturingSite: z.string(),
  linkedTools: z.array(z.number()).optional(),
});

const machineSchema = z.object({
  web: z.number(),
  notch: z.number(),
  louverWidth: z.number(),
  designNumber: z.string(),
  machineWidth: z.number(),
  machineSetNumber: z.string(),
  manufacturingSite: z.string(),
});

type FormSchema = z.infer<typeof metalstripschema> | z.infer<typeof machineSchema>;

const machineOptions = machines.map((machine) => ({
  id: machine.id,
  name: `Tool ${machine.designNumber}`,
  designNumber: machine.designNumber,
}));

export function MetalstripsToolsForm({
  type,
  onSubmit,
}: { type: "metalstrips" | "machines"; onSubmit: (data: FormSchema) => void }) {
  const schema = type === "metalstrips" ? metalstripschema : machineSchema;
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const fields =
    type === "metalstrips"
      ? [
          { name: "width", label: "Width", type: "number" },
          { name: "thickness", label: "Thickness", type: "number" },
          { name: "elongation", label: "Elongation", type: "number" },
          { name: "symmetry", label: "Symmetry", type: "text" },
          { name: "preMaterialQuality", label: "Pre-Material Quality", type: "text" },
          { name: "preMaterialThickness", label: "Pre-Material Thickness", type: "number" },
          { name: "preMaterialWidth", label: "Pre-Material Width", type: "number" },
          { name: "coating", label: "Coating", type: "text" },
          { name: "materialWeight", label: "Material Weight", type: "number" },
          { name: "elongationPercentage", label: "Elongation (%)", type: "number" },
          { name: "tearStrength", label: "Tear Strength", type: "number" },
          { name: "applicationInfo", label: "Application Information", type: "textarea" },
          { name: "designNumber", label: "Design Number", type: "text" },
          { name: "manufacturingSite", label: "Manufacturing Site", type: "select" },
        ]
      : [
          { name: "web", label: "Web", type: "number" },
          { name: "notch", label: "Notch", type: "number" },
          { name: "louverWidth", label: "Louver Width", type: "number" },
          { name: "designNumber", label: "Design Number", type: "text" },
          { name: "machineWidth", label: "Tool Width", type: "number" },
          { name: "machineSetNumber", label: "Tool Set Number", type: "text" },
          { name: "manufacturingSite", label: "Manufacturing Site", type: "select" },
        ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              name={field.name as any}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "textarea" ? (
                      <Textarea {...formField} className="h-20" />
                    ) : field.type === "select" ? (
                      <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manufacturing site" />
                        </SelectTrigger>
                        <SelectContent>
                          {manufacturingSites.map((site) => (
                            <SelectItem key={site} value={site}>
                              {site}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input type={field.type} {...formField} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {type === "metalstrips" && (
          <FormField
            control={form.control}
            name="linkedTools"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Linked Tools</FormLabel>
                </div>
                {machineOptions.map((machine) => (
                  <FormField
                    key={machine.id}
                    control={form.control}
                    name="linkedTools"
                    render={({ field }) => {
                      return (
                        <FormItem key={machine.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(machine.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), machine.id])
                                  : field.onChange(field.value?.filter((value) => value !== machine.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {machine.name} ({machine.designNumber})
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
